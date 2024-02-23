const user = {
    name:"user",
    title:"User",
    type:"document",
    fields:[
        {
            name:"name",
            title:"Name",
            type:"string",
            validation:Rule => Rule.required()
        },
        {
            name:"email",
            title:"Email",
            type:"string",
            validation:Rule => Rule.required().unique()
        },
        {
            name:"createdAt",
            title:"Created At",
            type:"datetime",
            options:{
                dateFormat:"YYYY-MM-DDTHH:mm:ssZ",
            },
            readOnly:true,
        }
    ]
}

export default user;