export function Send(data){
    fetch('https://api.caffaro.cloud/addUser', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Sucesso:', data);
    })
    .catch((error) => {
      console.error('Erro:', error);
    });
}