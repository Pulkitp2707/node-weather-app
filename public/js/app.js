const weatherForm = document.querySelector('form')
const element = document.querySelector('input')
const m1=document.querySelector('#message-1')
const m2=document.querySelector('#message-2')


weatherForm.addEventListener('submit' , (e)=>{

    e.preventDefault()

    m1.textContent='Loading....'
    m2.textContent=''
    fetch('http://localhost:3000/weather?address='+element.value).then((response) => {
    response.json().then((data) => {
        if(data.error){
            m1.textContent=data.error
        }
        else{
            m1.textContent='Forecast:'+data.forecast
            m2.textContent='Location:'+data.location
        }
      })
    })
})