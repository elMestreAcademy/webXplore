window.onload = function ()
{
    var btn = document.getElementById("add-task");
    var btnClear = document.getElementById("clear-task");
    var areaTexto = document.getElementById("nueva-tarea");
    var currentUl = document.getElementById("lista-interactiva");
    var listaTareas = JSON.parse(localStorage.getItem('listaTareas')) || [];
    // listaTareas = ['A', 'B'];
    var contador = 0;

    function salvarEstado()
    {
        localStorage.setItem('listaTareas', JSON.stringify(listaTareas));

    }

    var agregarTarea = function (tarea)
    {
        var newLi = document.createElement("li");

        newLi.className = "child"
        switch (contador++ % 3)
        {
            case 0:
                newLi.classList.add("child-one");
                break;

            case 1:
                newLi.classList.add("child-two");
                break;

            case 2:
                newLi.classList.add("child-three");
                break;

            default:
                break;
        }

        var newDiv = document.createElement("div");
        newLi.appendChild(newDiv);

        // Crea un nodo de texto
        var newContent = document.createTextNode(tarea);
        // Añade texto al elemento creado.
        newDiv.appendChild(newContent);
        // Añade el elemento creado y su contenido al DOM
        currentUl.append(newLi);


        var newBtn = document.createElement("button");
        newDiv.appendChild(newBtn);
        var newLabel = document.createTextNode("borrar tarea");
        newBtn.appendChild(newLabel);
        newBtn.className = "delete-button";

        newBtn.onclick = function ()
        {
            indiceDeTarea = listaTareas.indexOf(tarea)
            console.log("borra tarea: " + indiceDeTarea + "  " + tarea);
            delete listaTareas[indiceDeTarea];
            salvarEstado()
            this.parentNode.parentNode.remove();
        }

    }

    var limpiarLista = function ()
    {
        currentUl.innerHTML = ""
        // for (let child in currentUl.children) {
        //     // console.log("para aqui")
        //     currentUl.children[child].remove();
        // }

        localStorage.clear();
    }

    btn.onclick = function ()
    {
        agregarTarea(areaTexto.value);
        listaTareas.push(areaTexto.value)
        salvarEstado()
        areaTexto.value = "";
    }

    btnClear.onclick = function ()
    {
        localStorage.clear();
        limpiarLista();
    }

    listaTareas.forEach(tarea =>
    {
        agregarTarea(tarea);
    });

}
