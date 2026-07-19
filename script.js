const questions = [

{
    id:"name",
    label:"Name",
    type:"text"
},

{
    id:"email",
    label:"Email",
    type:"email"
},

{
    id:"age",
    label:"Age",
    type:"number"
},

{
    id:"about",
    label:"Tell us about yourself",
    type:"textarea"
},

{
    id:"terms",
    label:"Do you accept the Terms of Service?",
    type:"checkbox"
}

];

const form=document.getElementById("dynamicForm");

questions.forEach(q=>{

    const div=document.createElement("div");
    div.className="field";

    const label=document.createElement("label");
    label.textContent=q.label;

    div.appendChild(label);

    let input;

    switch(q.type){

        case "textarea":

            input=document.createElement("textarea");
            break;

        case "select":

            input=document.createElement("select");

            q.options.forEach(option=>{

                const o=document.createElement("option");
                o.value=option;
                o.textContent=option;
                input.appendChild(o);

            });

            break;

        case "checkbox":

            input=document.createElement("input");
            input.type="checkbox";
            break;

        default:

            input=document.createElement("input");
            input.type=q.type;

    }

    input.id=q.id;

    div.appendChild(input);

    form.appendChild(div);

});

document.getElementById("submitBtn").onclick=async()=>{

    const answers={};

    questions.forEach(q=>{

        const el=document.getElementById(q.id);

        if(q.type==="checkbox")
            answers[q.id]=el.checked;
        else
            answers[q.id]=el.value;

    });

    const res=await fetch("https://voln-rc-api.savi.api.dolphinnetwork.ie/api/submit",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(answers)

    });

    if(res.ok){

        alert("Submitted!");

        form.reset();

    }

    else{

        alert("Submission failed due to API error. Error code 4052.");

    }

}
