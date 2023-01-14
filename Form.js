 var productName=document.getElementById("productName");
var productPrice=document.getElementById("productPrice");
var productCategory=document.getElementById("category");
//var updateBtn=document.getElementById("Add");
var cuurentIndex = 0 ;
//an array of objects:
var container;
//add event to (Add) button:
/*updateBtn.addEventListener("click", function(){
    if (updateBtn.innerHTML == "Add")
    {Add();}
    else
    {saveUpdate();}
});*/

//check if the user is new or not :
if(localStorage.getItem("allProducts")==null){
    container=[];
}
else{
//JSON.parse transform the string to a JSON
//store the previous products in the array of objects 
container = JSON.parse(localStorage.getItem("allProducts"));
//calling the Display function to show the previous products which is added before
Display();
}

function Add(){
//an object has properties to describe the product :
var product = {
    name:productName.value,
    price:productPrice.value,
    category:productCategory.value}
container.push(product);

/*
To store the array of objects in the local storage using the setItem method
JSON.stringify transform JSON to string because the value must be a string
*/ 
localStorage.setItem( "allProducts" , JSON.stringify(container) );
Display();
clearForm();

}

function Display(){
    var tableTag = "";
    for(var i=0; i<container.length ;i++)
    {
        tableTag += `<tr><th scope="row">`+(i+1)+`</th><td>`+ container[i].name +`</td>
        <td>`+container[i].price+`</td>
        <td>`+container[i].category+`</td>
        <td><button class="btn btn-danger" onclick="updateProduct(`+i+`)" > Update </button> </td>
        <td><button class="btn btn-warning" onclick="deleteProduct(`+i+`)" > Delete</button> </td>
        </tr>`;
        
    }
    document.getElementById("data").innerHTML = tableTag; 
}

function Search(word){
    var searchString1 =``;
    var searchString2 =``;
    var results=``;

    for (var i=0 ; i<container.length ; i++ ){
        if ( container[i].name.toLowerCase().includes(word.toLowerCase().trim()) == true )
        {
            searchString1 += `<tr><th scope="row">`+(i+1)+`</th><td>`+ container[i].name +`</td>
            <td>`+container[i].price+`</td>
            <td>`+container[i].category+`</td>
            <td><button class="btn btn-danger" onclick="updateProduct(`+i+`)" > Update </button> </td>
            <td><button class="btn btn-warning" onclick="deleteProduct(`+i+`)" > Delete</button> </td>
            </tr>`;
            
            results=container[i].name.replace(word,`<span style="color:red">`+word+`</span>`);
            searchString2 +=`<p>`+results+`</p>`;
        }
    }
    document.getElementById("searchResult").innerHTML=searchString2;
    document.getElementById("data").innerHTML=searchString1;
} 

function hideElement()
{
    var element=``;
    element=`<p hidden ></p>`;
    document.getElementById("searchResult").innerHTML=element;
}

function clearForm(){
    productName.value="";
    productPrice.value="";
    productCategory.value="";
}

function deleteProduct(index){
    container.splice(index,1);
    localStorage.setItem("allProducts", JSON.stringify(container));
    Display();
}

function updateProduct(index){
    currentIndex=index;
    productName.value=container[index].name;
    productPrice.value=container[index].price;
    productCategory.value=container[index].category;
    updateBtn.innerHTML="Update";

}

function saveUpdate(){
    var product={
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
    }
    container[currentIndex]=product;
    localStorage.setItem("allProducts", JSON.stringify(container));
    Display();
    clearForm();
    updateBtn.innerHTML = "Add";
    
}

