const addBtn = document.querySelector(".add");
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
    notes.forEach((note) => {
        addNote(note);
    });
}

addBtn.addEventListener('click', () => {
    addNote();
});

function addNote (text = "") {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
    <div class="notes">
        <div class="toolbar">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea>
    </div>
`

    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');

    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    textArea.value = text;
    main.innerHTML = marked(text);

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden');
    });

    deleteBtn.addEventListener('click', () => {
        note.remove();

        updateLocalStorage();
    });

    textArea.addEventListener('input', (e) => {
        const { value } = e.target;

        main.innerHTML = marked(value);

        updateLocalStorage();
    });

    document.body.appendChild(note);
}

function updateLocalStorage() {
    const notesText = document.querySelectorAll("textarea");

    const notes = [];

    notesText.forEach((note) => {
        note.push(note.value);
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}



