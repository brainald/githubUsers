const containerDiv = document.getElementsByClassName("container")[0];

createDynamicList = list => {
    let listLength = list.length;

    if (listLength > 0) {
        let myList = document.createElement("div");
        myList.className = "oneRow";

        for (let i = 0; i < listLength;) {
            let listItem = document.createElement("div");
            listItem.className = "userItem";

            let image = document.createElement("img");
            image.src = list[i].avatar_url;

            let paragraph = document.createElement("p");
            paragraph.innerText = "Username: " + list[i].login;

            listItem.appendChild(image);
            listItem.appendChild(paragraph);
            myList.appendChild(listItem);

            i++;

            if (i % 5 === 0) {
                containerDiv.appendChild(myList);
                myList = document.createElement("div");
                myList.className = "oneRow";
            }
        }

        containerDiv.appendChild(myList);
    } else {
        // Create a text node with the message
        let message = document.createTextNode("There are no users!");

        // Append the message to the container
        containerDiv.appendChild(message);
    }
};

getUsers = async() => {
    const response = await fetch("http://api.github.com/users");
    const myJson = await response.json();
    return myJson;
};

myFunction = async() => {
    const users = await getUsers();
    createDynamicList(users);
};

myFunction();