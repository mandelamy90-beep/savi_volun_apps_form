export default {

async fetch(request, env){

    const url=new URL(request.url);

    if(url.pathname!=="/api/submit")
        return new Response("Not Found",{status:404});

    if(request.method!=="POST")
        return new Response("Method Not Allowed",{status:405});

    const answers=await request.json();

    await env.DB.prepare(

        `
        INSERT INTO submissions
        (
            submitted_at,
            answers
        )
        VALUES
        (?,?)
        `

    )

    .bind(

        new Date().toISOString(),
        JSON.stringify(answers)

    )

    .run();

    return Response.json({

        success:true

    });

}

}