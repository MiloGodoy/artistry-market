const product = {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name:'name',
            title:'Name',
            type:'string',
            validation:Rule => Rule.required()
        },
        {
            name:'slug',
            title:'Slug',
            type:'slug',
            options:{
                source:'name',
                maxLength:200
            },
            validation:Rule => Rule.required()
        },
        {
            name:'image',
            title:'Image',
            type:'image',
            options: {
                hotspot:true,
            },
            validation:Rule => Rule.required()
        },
        {
            name:'description',
            title:'Description',
            type:'text',
            validation:Rule => Rule.required(),
        },
        {
            name:'price',
            title:'Price',
            type:"number",
            validation:Rule => Rule.required()
        },
        {
            name:"createdAt",
            title:"Created At",
            type:"datetime",
            options:{
                dateFormat:"YYYY-MM-DDTHH:mm:ssZ",
            },
            readOnly:true,
        },
    ]
}

export default product;