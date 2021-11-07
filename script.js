
(function () {
    const containers = document.querySelectorAll(".container");
    const buttons = document.querySelectorAll(".buttonAdd");
    const hideButtons = document.querySelectorAll(".hide")
    const showButtons = document.querySelectorAll(".show")
    var textArea = document.getElementById("textArea");
    var storedList = localStorage.getItem('lists');
    const lists = [];

    // if (storedList != null) {
    //     lists = JSON.parse(storedList)
    // }

    // Object.keys(lists).forEach(key => {
    //     let list = document.querySelector(`.container#${key}`)
    //     lists[key].forEach(item => {
    //         let element = createCard(item.content)
    //         list.appendChild(element)
    //     })
    // })


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
                dataForLocalStorage();
            }
            else {
                alert("Please enter Name")
            }






        })
    })



    document.addEventListener("dragstart", (e) => {
        const element = e.target.closest(".draggable");
        if (element) {
            element.classList.add("dragging");

        }
    });

    document.addEventListener("dragend", (e) => {
        const element = e.target.closest(".draggable");
        if (element) {
            element.classList.remove("dragging");
        }
    });

    document.addEventListener("drop", function (event) {
        event.preventDefault();
    }, false);


    // draggables.forEach((draggable) => {
    //     draggable.addEventListener("dragstart", () => {
    //         draggable.classList.add("dragging");
    //         console.log("drag start");
    //     });

    //     draggable.addEventListener("dragend", () => {
    //         draggable.classList.remove("dragging");
    //     });
    // });

    // mainContainer.addEventListener("dragover", (e) => {
    //     e.preventDefault();
    //     const container = e.target.closest(".container");
    //     if (container) {
    //         const afterElement = getDragAffterElement(container, e.clientY);
    //         const draggable = document.querySelector(".dragging");
    //         if (afterElement == null) {
    //             container.appendChild(draggable);
    //         } else {
    //             container.insertBefore(draggable, afterElement);
    //         }
    //     }
    // });




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
            dataForLocalStorage();

        });


        // draggables.forEach((draggable) => {
        //     draggable.addEventListener("dragstart", () => {
        //         draggable.classList.add("dragging");
        //         console.log("drag start");
        //     });

        //     draggable.addEventListener("dragend", () => {
        //         draggable.classList.remove("dragging");
        //     });
        // });

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
    function dataForLocalStorage() {
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
        localStorage.setItem("data", JSON.stringify(data));
    }

    // function updateLocalStorageLists() {
    //     document.querySelectorAll('.container').forEach(list => {
    //         let property = list.getAttribute('id')
    //         lists[property] = [];

    //         list.querySelectorAll('.draggable textarea.text-content').forEach(item => {
    //             lists[property].push({ content: item.innerText })
    //         })

    //     })

    //     localStorage.setItem('lists', JSON.stringify(lists))
    // }


    // addSectionButton.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     createElements()


    // })

    // function createElements() {

    //     const newTabel = document.createElement('div')
    //     newTabel.classList.add('container')
    //     newTabel.id = new Date().getTime()
    //     mainContainer.append(newTabel)
    //     newTabel.innerHTML = `<button id="Hold" class="buttonAdd btn btn-success">+</button>
    //     <p class="draggable" draggable="true">3 <i class="fas fa-minus-circle"></i></p>
    //     <p class="draggable" draggable="true">4 <i class="bi bi-trash"></i></p>`
    //     addsection(newTabel)

    // }
    window.addEventListener("load", function () {
        const dataFromStorage = localStorage.getItem("data");
        console.log(dataFromStorage);
        const parsedData = JSON.parse(dataFromStorage);
        const columns = document.querySelectorAll(".container");

        parsedData.forEach((column, index) => {
            const currAddACard = columns.item(index).querySelector(".container");
            column.items.forEach(item => {
                const itemDiv = document.createElement("p");
                itemDiv.innerHTML = `<p class="draggable" draggable="true">${item}</p>`;
                columns.item(index).insertBefore(itemDiv, currAddACard);
            })
            // forDeleteCard();
            // dragNDrop();
        })
    })

})();