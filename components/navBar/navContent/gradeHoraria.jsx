import { Text, View} from 'react-native';
import gradeHorariaStyles from '@/styles/gradeHorariaStyles';


function gradeHoraria({}) {
    return (
     
        <View id='content' style={gradeHorariaStyles.content}>  

            <Text style={gradeHorariaStyles.title}>Segunda-Feira</Text>
            <View style={gradeHorariaStyles.horarios}>

                

                {/*Aqui está o primeiro tempo*/}
                <Text style={gradeHorariaStyles.tempos}>07:50 - 08:40</Text>
                {/*Aqui está as informações referente ao professor e a matéria desse tempo*/}
                <View style={gradeHorariaStyles.primeiroTempo}>
                    <Text style={gradeHorariaStyles.materias}>MATEMÁTICA</Text>
                    <Text style={gradeHorariaStyles.professor}>Helder</Text>
                </View>


                {/*Isso é uma linha de intervalo*/}
                <Text style={gradeHorariaStyles.intervalo}>LANCHE</Text>


                {/*Aqui está o segundo tempo*/}
                <Text style={gradeHorariaStyles.tempos}>08:50 - 10:30</Text>
                {/*Aqui está as informações referente ao professor e a matéria desse tempo*/}
                <View style={gradeHorariaStyles.segundoTempo}>
                    <Text style={gradeHorariaStyles.materias}>SOCIOLOGIA</Text>
                    <Text style={gradeHorariaStyles.professor}>André</Text>
                </View>

                {/*Aqui está o terceiro tempo*/}
                <Text style={gradeHorariaStyles.tempos}>10:30 - 12:10</Text>
                {/*Aqui está as informações referente ao professor e a matéria desse tempo*/}
                <View style={gradeHorariaStyles.terceiroTempo}>
                    <Text style={gradeHorariaStyles.materias}>BIOLOGIA</Text>
                    <Text style={gradeHorariaStyles.professor}>Leandro</Text>
                </View>
                
                {/*Isso é uma linha de intervalo*/}
                <Text style={gradeHorariaStyles.intervalo}>ALMOÇO</Text>

                {/*Aqui está o quarto tempo*/}
                <Text style={gradeHorariaStyles.tempos}>12:50 - 14:30</Text>
                {/*Aqui está as informações referente ao professor e a matéria desse tempo*/}
                <View style={gradeHorariaStyles.quartoTempo}>
                    <Text style={gradeHorariaStyles.materias}>FÍSICA</Text>
                    <Text style={gradeHorariaStyles.professor}>Sandra Mara</Text>
                </View>

                {/*Aqui está o quinto tempo*/}
                <Text style={gradeHorariaStyles.tempos}>14:30 - 16:10</Text>
                {/*Aqui está as informações referente ao professor e a matéria desse tempo*/}
                <View style={gradeHorariaStyles.quintoTempo}>
                    <Text style={gradeHorariaStyles.materias}>QUÍMICA</Text>
                    <Text style={gradeHorariaStyles.professor}>Ana Beatriz</Text>
                </View>

                {/*Isso é uma linha de intervalo*/}
                <Text style={gradeHorariaStyles.intervalo}>LANCHE</Text>

                {/*Aqui está o sexto tempo*/}
                <Text style={gradeHorariaStyles.tempos}>16:20 - 18:10</Text>
                {/*Aqui está as informações referente ao professor e a matéria desse tempo*/}
                <View style={gradeHorariaStyles.sextoTempo}>
                    <Text style={gradeHorariaStyles.materias}>SMAS</Text>
                    <Text style={gradeHorariaStyles.professor}>Jeanne</Text>
                </View>
            </View>
            
        </View>
      
    );
};

export default gradeHoraria;
