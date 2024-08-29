import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

const backend = defineBackend({
  auth,
  data,
});
// Aqui você está extraindo os recursos de nível L1 do User Pool do CloudFormation.
const { cfnUserPool } = backend.auth.resources.cfnResources;

// Esta condição verifica se a propriedade 'schema' é um array.
if (Array.isArray(cfnUserPool.schema)) {
  // Aqui você está adicionando um novo atributo personalizado ao esquema do User Pool.
  cfnUserPool.schema.push({
    name: 'matricula', // O nome do novo atributo.
    attributeDataType: 'String', // O tipo de dado do atributo, neste caso, um booleano.
    developerOnlyAttribute: false, // Indica que é um atributo apenas para desenvolvedores.
  });
  cfnUserPool.schema.push({
    name: 'hasCompletedSingup', // O nome do novo atributo.
    attributeDataType: 'String', // O tipo de dado do atributo, neste caso, um booleano.
    developerOnlyAttribute: false, // Indica que é um atributo apenas para desenvolvedores.
  });
  cfnUserPool.schema.push({
    name: 'position', // O nome do novo atributo.
    attributeDataType: 'String', // O tipo de dado do atributo, neste caso, um booleano.
    developerOnlyAttribute: false, // Indica que é um atributo apenas para desenvolvedores.
  });
  
  cfnUserPool.addPropertyOverride('Policies.PasswordPolicy.MinimumLength', 6);
  cfnUserPool.addPropertyOverride('Policies.PasswordPolicy.RequireUppercase', true);
  cfnUserPool.addPropertyOverride('Policies.PasswordPolicy.RequireNumbers', true);
  cfnUserPool.addPropertyOverride('Policies.PasswordPolicy.RequireSymbols', false);
}