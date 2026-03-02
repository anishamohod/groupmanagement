let groups = JSON.parse(localStorage.getItem("groups")) || [];
let editId = null;

function saveToStorage() {
    localStorage.setItem("groups", JSON.stringify(groups));
}

function displayGroups() {
    const table = document.getElementById("groupTable");
    table.innerHTML = "";

    groups.forEach(group => {
        table.innerHTML += `
            <tr>
                <td>${group.id}</td>
                <td>${group.name}</td>
                <td class="${group.isActive ? 'active' : 'inactive'}">
                    ${group.isActive ? "Active" : "Inactive"}
                </td>
                <td>
                    <button onclick="editGroup(${group.id})">Edit</button>
                    <button onclick="toggleStatus(${group.id})">
                        ${group.isActive ? "Deactivate" : "Activate"}
                    </button>
                </td>
            </tr>
        `;
    });
}

function addGroup() {
    const nameInput = document.getElementById("groupName");
    const message = document.getElementById("message");
    const name = nameInput.value.trim();

    if (name === "") {
        message.textContent = "Group name cannot be empty!";
        message.style.color = "red";
        return;
    }

    const duplicate = groups.find(g => g.name.toLowerCase() === name.toLowerCase() && g.id !== editId);

    if (duplicate) {
        message.textContent = "Group name must be unique!";
        message.style.color = "red";
        return;
    }

    if (editId) {
        const group = groups.find(g => g.id === editId);
        group.name = name;
        editId = null;
        message.textContent = "Group updated successfully!";
    } else {
        const newGroup = {
            id: groups.length + 1,
            name: name,
            isActive: true
        };
        groups.push(newGroup);
        message.textContent = "Group added successfully!";
    }

    message.style.color = "green";
    nameInput.value = "";
    saveToStorage();
    displayGroups();
}

function editGroup(id) {
    const group = groups.find(g => g.id === id);
    document.getElementById("groupName").value = group.name;
    editId = id;
}

function toggleStatus(id) {
    const group = groups.find(g => g.id === id);
    group.isActive = !group.isActive;
    saveToStorage();
    displayGroups();
}

displayGroups();