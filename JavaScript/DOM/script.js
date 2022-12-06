function addItem(name, howImportant)
{
    var list = document.getElementById("item-list");

    var newItem =document.createElement("input")
    newItem.type="input"
    newItem.className="list-item "+howImportant
    newItem.value=name;

    var lastElement=list.lastChild;

    list.appendChild(newItem);
}

function addItemButton()
{
    var itemName=document.getElementById("item-text").value;
    var itemType=document.getElementById("select-type").value;

    addItem(itemName, itemType);
}