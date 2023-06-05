
const amount=document.getElementById('expense')
const description=document.getElementById('description')
const category=document.getElementById('category')
const list=document.getElementById('list')
const submit=document.getElementById('submit')

submit.addEventListener('click',(e)=>{
    e.preventDefault()
    axios.post('http://127.0.0.1:3000/expense',{
        amount: amount.value,
        description: description.value,
        category: category.value
    }).then((res) => {
        const expense=document.createElement('li')
        expense.setAttribute('id',res.data.id)
        expense.appendChild(document.createTextNode(res.data.amount+' Rs - '+res.data.description+' - '+res.data.category+'  '))
        
        const dbutton=document.createElement('button')
        dbutton.setAttribute('class','btn btn-danger btn-sm')
        dbutton.setAttribute('type','button')
        dbutton.appendChild(document.createTextNode('Delete'))
        
        const ebutton=document.createElement('button')
        ebutton.setAttribute('class','btn btn-warning btn-sm')
        ebutton.setAttribute('type','button')
        ebutton.appendChild(document.createTextNode('Edit'))
        
        expense.appendChild(dbutton)
        expense.appendChild(ebutton)

        list.appendChild(expense)        
    }).catch((err) => {
        console.log(err);
    });  
})

list.addEventListener('click',(e)=>{
    e.preventDefault()
    if(e.target.classList.contains('btn-danger')){
        list.removeChild(e.target.parentElement)

        axios.delete(`http://127.0.0.1:3000/expense/${e.target.parentElement.id}`).then((res) => {
            // console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }

})

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://127.0.0.1:3000/expense', {headers: {'Authorization': localStorage.getItem('token')}}).then((res) => {
        res.data.forEach(element => {
            const expense=document.createElement('li')
            expense.setAttribute('id',element.id)
            expense.appendChild(document.createTextNode(element.amount+' Rs - '+element.description+' - '+element.category+'  '))
            
            const dbutton=document.createElement('button')
            dbutton.setAttribute('class','btn btn-danger btn-sm')
            dbutton.setAttribute('type','button')
            dbutton.appendChild(document.createTextNode('Delete'))
            
            const ebutton=document.createElement('button')
            ebutton.setAttribute('class','btn btn-warning btn-sm')
            ebutton.setAttribute('type','button')
            ebutton.appendChild(document.createTextNode('Edit'))
            
            expense.appendChild(dbutton)
            expense.appendChild(ebutton)

            list.appendChild(expense)
        });
    }).catch((err) => {
        console.log(err);
    });
})