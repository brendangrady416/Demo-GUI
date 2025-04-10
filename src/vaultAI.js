document.addEventListener("DOMContentLoaded", function () {
    const tagList = document.getElementById("tag-list");
    const tagInput = document.getElementById("tag-input");
    const addTagBtn = document.getElementById("add-tag-btn");

    let tags = [];

    function renderTags() {
        tagList.innerHTML = "";
        tags.forEach((tag, index) => {
            const tagEl = document.createElement("div");
            tagEl.className = "tag";
            tagEl.innerHTML = `
                ${tag}
                <span class="remove-tag" data-index="${index}">&times;</span>
            `;
            tagList.appendChild(tagEl);
        });
    }

    addTagBtn.addEventListener("click", () => {
        const newTag = tagInput.value.trim();
        if (newTag && !tags.includes(newTag)) {
            tags.push(newTag);
            renderTags();
            tagInput.value = "";
        }
    });

    tagList.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-tag")) {
            const index = e.target.getAttribute("data-index");
            tags.splice(index, 1);
            renderTags();
        }
    });
});
