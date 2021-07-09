import Task from "./task.js";
import ListTask from "./taskService.js";
import Validation from "./validation.js";

const listTask = new ListTask();
const validation = new Validation();

const getEle = (id) => {
    return document.getElementById(id);
};

let listTacks = [];
const renderTable = (list) => {

    let contentHTML = "";
    let contentHTML1 = "";
    list.forEach((item) => {
        const status = `'${item.status}'`;
        switch (item.status) {
            case "completed":
                contentHTML += `<li>${item.task}
                <i class="fas fa-trash-alt btn" onclick="xoaTask(${item.id})"></i>
                <i class="fas fa-check-circle check btn fa-spin" onclick="capNhatTask(${item.id}, ${status})"></i>
                </li>`;
                break;
            default: contentHTML1 += `<li>${item.task}
                <i class="fas fa-trash-alt btn " onclick="xoaTask(${item.id})"></i>
                <i class="far fa-check-circle btn fa-spin" onclick="capNhatTask(${item.id}, ${status})"></i>
                </li>`;
                break;
        }
    });
    getEle("completed").innerHTML = contentHTML;
    getEle("todo").innerHTML = contentHTML1;
};

const fetchData = () => {
    getEle("overlay").style.display = "block";
    listTask
        .callApi("Task", "GET", null)
        .then((result) => {
            renderTable(result.data)
            listTacks = result.data;
            getEle("overlay").style.display = "none";
        })
        .catch((err) => {
            console.log(err);
            getEle("overlay").style.display = "none";
        });
};
fetchData();

const themTask = () => {
    const _task = getEle("newTask").value;
    const _status = "todo";

    var isValid = true;
    isValid &=
        validation.kiemTraRong(_task, "thongBao", "(*) Task Không Được Rỗng") &&
        validation.kiemTraTaiKhoanTrung(
            _task,
            "thongBao",
            "(*) Task đã tồn tại!",
            listTacks
        );
    if (isValid) {
        getEle("overlay").style.display = "block";
        const task = new Task(
            "",
            _task,
            _status,
        );
        listTask
            .callApi("Task", "POST", task)
            .then((result) => {
                alert("Add success!");
                fetchData();
                getEle("overlay").style.display = "none";
            })
            .catch((err) => {
                console.log(err);
                getEle("overlay").style.display = "none";
                
            });
    }
    return null;
}
window.themTask = themTask;

const xoaTask = (id) => {
    var result = confirm("Bạn có muốn xóa bản ghi này?");
    getEle("overlay").style.display = "block";
    if (result == true) {
        listTask
            .callApi(`Task/${id}`, "DELETE", null)
            .then(() => {
                setTimeout(() => {
                    fetchData();
                    getEle("overlay").style.display = "none";
                    alert("Delete success!");
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
                getEle("overlay").style.display = "none";
            });
    }
};
window.xoaTask = xoaTask;

getEle("newTask").addEventListener("click", () => {
    document.getElementById("thongBao").innerHTML = "";
    document.getElementById("thongBao").className = "";
})


const capNhatTask = (id, status) => {
    const checkStatus = status === "completed" ? "todo" : "completed";
    const queryBody = {
        status: checkStatus,
    }
    getEle("overlay").style.display = "block";
    listTask
        .callApi(`Task/${id}`, "PUT", queryBody)
        .then(() => {
            setTimeout(() => {
                fetchData();
                getEle("overlay").style.display = "none";
            }, 2000);

        })
}
window.capNhatTask = capNhatTask;

getEle("two").addEventListener("click", () => {
    listTacks.sort(function (a, b) {
        getEle("overlay").style.display = "none";
        if (a.task.toLowerCase() < b.task.toLowerCase()) { return -1; }
        if (a.task.toLowerCase() > b.task.toLowerCase()) { return 1; }
        return 0;
    });
    renderTable(listTacks);
});
getEle("three").addEventListener("click", () => {
    listTacks.sort(function (a, b) {
        if (a.task.toLowerCase() > b.task.toLowerCase()) { return -1; }
        if (a.task.toLowerCase() < b.task.toLowerCase()) { return 1; }
        return 0;
    });
    renderTable(listTacks);
});
getEle("all").addEventListener("click", () => {
    listTacks.sort(function (a, b) {
        if (a.id.toLowerCase() < b.id.toLowerCase()) { return -1; }
        if (a.id.toLowerCase() > b.id.toLowerCase()) { return 1; }
        return 0;
    });
    renderTable(listTacks);
});
getEle("one").addEventListener("click", () => {
    listTacks.sort(function (a, b) {
        if (a.id.toLowerCase() > b.id.toLowerCase()) { return -1; }
        if (a.id.toLowerCase() < b.id.toLowerCase()) { return 1; }
        return 0;
    });
    renderTable(listTacks);
});