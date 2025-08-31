const prisma = require("../util.js/db")

exports.getPosts = async (req,res)=>{

try {

    const posts = await prisma.post.findMany({

    where:{published:true},
    orderBy:{createdAt: "desc"},
    include:{
        author:{
            select:{id:true,username:true,email:true},

        },
    },
    });

    res.json(posts)

}catch(err){

    res.status(500).json({error:"failed to get posts"})

}};

exports.getPostsById = async (req,res)=>{

  const postId = parseInt(req.params.id);
    try {
        const post = await prisma.post.findUnique({

            where:{id:postID},
            include:{
                author:{
                    select:{id:true,username:true,email:true},
                },
                comment:{
                    where:{status:"VISIBLE"},
                    orderBy:{CreatedAt: "desc"},
                },
            },
        })


         if (!post || !post.published) {
        return res.status(404).json({ error: "Post not found" });
        }

    res.json(post)   

    }catch(err){

    console.log(err)
    res.status(500).json({error:"failed to get post"})
    }

}