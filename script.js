
(function () {
    const containers = document.querySelectorAll(".container");
    const buttons = document.querySelectorAll(".buttonAdd");
    const hideButtons = document.querySelectorAll(".hide")
    const showButtons = document.querySelectorAll(".show")
    var textArea = document.getElementById("textArea");
    var remobeBtn = document.querySelector(".buttonRemove")


    //Adding text area in container and removig text from same
    buttons.forEach((button) => {

        button.addEventListener('click', (e) => {
            e.preventDefault();
            let newLocal = document.getElementById("textarea-" + e.target.id)
            newLocal.appendChild(textArea)
            newLocal.style.display = "flex";
            textArea.value = "";





        })
    })

    hideButtons.forEach((hidebutton) => {
        hidebutton.addEventListener('click', (e) => {
            e.preventDefault();
            let newLocal = document.getElementById("textarea-" + e.target.id)
            newLocal.style.display = "none";
        })
    })

    // addinng name for draggable Elements
    showButtons.forEach((showbutton) => {

        showbutton.addEventListener('click', (e) => {
            e.preventDefault();
            let newLocal = document.getElementById("textarea-" + e.target.id)
            newLocal.style.display = "none";
            let curentList = document.getElementById("container-" + e.target.id)
            let newElement = document.createElement("p")
            newElement.classList.add("draggable")
            newElement.draggable = true;
            newElement.innerHTML = textArea.value;


            if (textArea.value != "") {
                curentList.append(newElement)
                savetoSessionStorage();
            }
            else {
                alert("Please enter Name")
            }






        })
    })

    //Removing draggable Ellemnets from trash

    remobeBtn.addEventListener("click", (e) => {
        e.preventDefault()
        let newLocal = document.getElementById("container-" + e.target.id)
        let myNode = newLocal.querySelectorAll(".draggable")
        myNode.forEach((node) => {
            node.remove()
            sessionStorage.clear();
        })

    })


    // drag start and add class list dragging on draggable elements
    document.addEventListener("dragstart", (e) => {
        e.preventDefault()
        const element = e.target.closest(".draggable");
        if (element) {
            element.classList.add("dragging");

        }
    });

    //drag end remove dragging class from dragable lements
    document.addEventListener("dragend", (e) => {
        e.preventDefault()
        const element = e.target.closest(".draggable");
        if (element) {
            element.classList.remove("dragging");
        }
    });






    containers.forEach((container) => {
        container.addEventListener("dragover", (e) => {
            e.preventDefault();

            const afterElement = getDragAffterElement(container, e.clientY);
            const draggable = document.querySelector(".dragging")

            if (afterElement == null) {
                container.appendChild(draggable);
            } else {
                container.insertBefore(draggable, afterElement);
            }
            savetoSessionStorage();

        });
    });

    function getDragAffterElement(container, y) {
        const draggableElements = [
            ...container.querySelectorAll(".draggable:not(.dragging)"),
        ];

        return draggableElements.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            { offset: Number.NEGATIVE_INFINITY }
        ).element;
    }



    const data = [];
    // function savetoSessionStorage set draggable inner textContent and position off dragable elmenst in session storage
    function savetoSessionStorage() {
        data.length = 0;
        const all_column = document.querySelectorAll(".container");

        all_column.forEach((column, index) => {
            const title = column.querySelector(".header").textContent;
            const cardItems = column.querySelectorAll(".draggable");
            const cardItemsContent = [];

            cardItems.forEach((item) => {
                return cardItemsContent.push(item.textContent);
            });
            data.push({ index: index, title: title, items: cardItemsContent });
        });
        sessionStorage.setItem("data", JSON.stringify(data));
    }

    // loading function from session storage
    window.addEventListener("load", function () {
        const dataFromStorage = sessionStorage.getItem("data");
        const parsedData = JSON.parse(dataFromStorage);
        const columns = document.querySelectorAll(".container");

        if (parsedData != null) {
            parsedData.forEach((column, index) => {
                const currAddACard = columns.item(index).querySelector(".container");
                column.items.forEach(item => {
                    const itemDiv = document.createElement("p");
                    itemDiv.innerHTML = `<p class="draggable" draggable="true">${item}</p>`;
                    columns.item(index).insertBefore(itemDiv, currAddACard);
                })

            })
        }
    })

})();