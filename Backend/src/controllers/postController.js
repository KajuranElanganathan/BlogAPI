const prisma = require("../util/db")

async function getPosts(req,res){

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

async function getPostsById (req,res) {

  const postId = parseInt(req.params.id);
    try {
        const post = await prisma.post.findUnique({

            where:{id:postId},
            include:{
                author:{
                    select:{id:true,username:true,email:true},
                },
                comments:{
                    where:{status:"VISIBLE"},
                    orderBy:{createdAt: "desc"},
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

};


async function createPost(req,res){

    const {title, content} = req.body;


    if (!title || !content){

        return res.status(400).json({error:"title and content required"}) 

    }


    try {

        const post = await prisma.post.create({

            data:{

                title,
                content,
                published:false,
                authorId:req.user.id,



            },
            include:{

                author:{select:{id:true,username:true,email:true}}

            },


        });

    res.status(201).json(post)

    }catch(err){

        console.log(err)
        return res.status(500).json({error:'failed to get post'})

    }

}


async function updatePost(req, res) {
  const id = Number(req.params.id);
  const { title, content } = req.body;

  try {
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: "Post not found" });

    const isOwner = existing.authorId === req.user.id;
    const isAdmin = req.user.role === "ADMIN";
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const updated = await prisma.post.update({
      where: { id },
      data: { title, content },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update post" });
  }}

  async function togglePublish(req,res){

    const id = Number(req.params.id)

    try{

        const existing = await prisma.post.findUnique({where: {id}})

        if(!existing){

            return res.status(404).json({error:"post not found"})
        }

        const isOwner = existing.authorId === req.user.id;
        const isAdmin = req.user.role === "ADMIN";

        if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: "Forbidden" });
    }


    const updated = await prisma.post.update({

        where:{id},
        data:{published: !existing.published},

    })

    res.json(updated)


    }catch(err){

    console.log(err)
    res.status(500).json({error:"fail"})

    }
  }

  async function deletePost(req,res){


    const id = Number(req.params.id) //post id

    try {


        const existing = await prisma.post.findUnique({where: {id}})

        if(!existing){

            return res.status(404).json({error:"post not found"})
        }


        const isOwner = req.user.id === existing.authorId;
        const isAdmin = req.user.role === "ADMIN"

        if (!isOwner && !isAdmin){

            return res.status(403).json({error:"forbidden"})

        }


        const del = await prisma.post.delete({

            where:{id}

        })


        res.json({message:"post deleted successfully"})




    }catch(err){

        res.status(500).json({error:"failed to delete"})
    
    }
  }

  async function getAllPosts(req,res){

    try {   

    const posts = await prisma.post.findMany({

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
}   
  }

  module.exports = {
  
  getPostsById,
  getPosts,
  createPost,
  updatePost,
  togglePublish,
  deletePost,
  getAllPosts



  }