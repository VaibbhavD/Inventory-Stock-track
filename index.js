const apiid="8bc8f3b43fc247c5aed04e76fef314bf";

// ----------------------------------------------------------------------------savedetails

function savedetails(event){
   event.preventDefault();
   const itemname=event.target.itemname.value;
   const description=event.target.description.value;
   const price=event.target.price.value;
   const quantity=event.target.quantity.value;

   const itemobj={
       itemname,
       description,
       price,
       quantity,
   }

   axios.post("https://crudcrud.com/api/"+apiid+"/inventorystocks",itemobj)
   .then(res=>console.log(res))
   .catch(err=>console.log(err))

   showitemdetails(itemobj);
   document.getElementById("item-name").value="";
   document.getElementById("description").value="";
   document.getElementById("price").value="";
   document.getElementById("quantity").value="";
}


// ---------------------------------------------------------------------------window addeventlistner

   window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/"+apiid+"/inventorystocks")
    .then(response => {
        for(var i=0;i<response.data.length;i++)
        {
            showitemdetails(response.data[i]);
        }
    })
    .catch(err=>console.log(err))
    })

// -------------------------------------------------------------------------------showdetails

function showitemdetails (itemobj){
    itemobj={
        _id:itemobj._id,
        itemname:itemobj.itemname,
        description:itemobj.description,
        price:itemobj.price,
        quantity:itemobj.quantity
    }
   const parent=document.getElementById("main");
   const child=document.createElement("li");

   const pname=document.createElement("ol");
   pname.className="ol";
   pname.textContent=itemobj.itemname;
   const pdes=document.createElement("ol");
   pdes.className="ol";
   pdes.textContent=itemobj.description;
   const pprice=document.createElement("ol");
   pprice.className="ol2";
   pprice.textContent=itemobj.price;
   const pquan=document.createElement("ol");
   pquan.className="ol2";
   pquan.textContent=itemobj.quantity;

   child.appendChild(pname);
   child.appendChild(pdes);
   child.appendChild(pprice);
   child.appendChild(pquan);


   // -------------------------------------------------------------------------------------buy1

   const buy1=document.createElement('input')
   buy1.type="button";
   buy1.className="buy";
   buy1.value="BUY 1";
   buy1.onclick=()=>{edit(itemobj,1);}
   child.appendChild(buy1);
    // parent.removeChild(child)
    // axios.delete("https://crudcrud.com/api/"+apiid+"/inventorystocks/"+itemobj._id)
    // .then(res=>console.log(res))
    // .catch(err=>console.log(err))
    
    



    // ----------------------------------------------------------------------------------------buy2
   const buy2=document.createElement('input')
   buy2.type="button";
   buy2.className="buy";
   buy2.value="BUY 2";
   buy2.onclick=()=>{edit(itemobj,2)}
   child.appendChild(buy2);

  // ----------------------------------------------------------buy3
   const buy3=document.createElement('input')
   buy3.type="button";
   buy3.className="buy";
   buy3.value="BUY 3";
   buy3.onclick=()=>{edit(itemobj,3)}
   child.appendChild(buy3);
   parent.appendChild(child);



// ----------------------------------------------------------------------------------------Edit

function edit(itemobj,num){
    if(child.childNodes[3].textContent-num <0)
    {
        alert("This Item Out Of Inventory")
    }
    else{
    obj={
        itemname:itemobj.itemname,
        description:itemobj.description,
        price:itemobj.price,
        quantity:itemobj.quantity-num,
        }
    axios.put("https://crudcrud.com/api/"+apiid+"/inventorystocks/"+itemobj._id,obj)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
    child.childNodes[3].textContent=child.childNodes[3].textContent-num;
}
    }

}

