const questions = [

    {
        id: "name",
        label: "Name",
        required: true,
        type: "text"
    },

    {
        id: "email",
        label: "Email",
        required: true,
        type: "email"
    },

    {
        id: "age",
        label: "Age",
        required: true,
        type: "number"
    },

    {
        id: "about",
        label: "Tell us about yourself",
        required: true,
        type: "textarea"
    },

    {
        id: "role",
        label: "How did you find us?",
        type: "radio",
        required: true,
        options: [
            "Instagram",
            "X/Twitter",
            "TikTok",
            "Other"
        ]
    },

    {
        id: "terms",
        label: "Do you accept the Terms of Service?",
        type: "checkbox"
    }

];

const form = document.getElementById("dynamicForm");

questions.forEach(q => {

    const div = document.createElement("div");
    div.className = "field";

    const label = document.createElement("label");
    label.textContent = q.label;

    div.appendChild(label);

    let input;

    switch (q.type) {
        case "radio":

            input = document.createElement("div");

            q.options.forEach((option, index) => {

                const wrapper = document.createElement("label");

                const radio = document.createElement("input");

                radio.type = "radio";
                radio.name = q.id;
                radio.value = option;

                if (q.required && index === 0) {
                    radio.required = true;
                }

                wrapper.appendChild(radio);

                wrapper.appendChild(
                    document.createTextNode(option)
                );

                input.appendChild(wrapper);

            });

            break;

        case "textarea":

            input = document.createElement("textarea");
            break;

        case "select":

            input = document.createElement("select");

            q.options.forEach(option => {

                const o = document.createElement("option");
                o.value = option;
                o.textContent = option;
                input.appendChild(o);

            });

            break;

        case "checkbox":

            input = document.createElement("input");
            input.type = "checkbox";
            break;

        default:

            input = document.createElement("input");
            input.type = q.type;

    }

    input.id = q.id;

    if (q.required) {
        input.required = true;
    }

    div.appendChild(input);

    form.appendChild(div);

});

document.getElementById("submitBtn").onclick=async(e)=>{

    if(!document.getElementById("dynamicForm").checkValidity()){

        document.getElementById("dynamicForm").reportValidity();

        return;

    }

    const answers = {};

    questions.forEach(q => {

        const el = document.getElementById(q.id);

        if (q.type === "checkbox") {

            answers[q.id] = el.checked;

        }

        else if (q.type === "radio") {

            const selected = document.querySelector(
                `input[name="${q.id}"]:checked`
            );

            answers[q.id] = selected ? selected.value : null;

        }

        else {

            answers[q.id] = el.value;

        }

    });

    const res = await fetch("https://voln-rc-api.savi.api.dolphinnetwork.ie/api/submit", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(answers)

    });

    if (res.ok) {

        alert("Submitted!");

        form.reset();

    }

    else {

        alert("Submission failed due to API error. Error code 4052.");

    }

}
