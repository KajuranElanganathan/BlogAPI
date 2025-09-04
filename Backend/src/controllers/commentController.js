const prisma = require("../util/db")
//remember to add validation to the comments after, 


//get comments
async function getComments(req,res){

    const postId = Number(req.params.id)

    try {

    const comments = await prisma.comment.findMany({

        where: { postId: postId, status: "VISIBLE" },
        orderBy: {createdAt: "desc"},
        include: {
            author: {select: {id:true,username:true,email:true}}
        },
    })
    res.json(comments)
    }catch(err){

        res.status(500).json({error:"failed to retrive comments"})// 500 for server error

    }

}
//post comments
async function createComment(req,res){


    const postId = Number(req.params.id)

    const {body} = req.body

    if (!body){

        return res.status(400).json({error:"comment body cannot be empty"})// code 400 for missing fields


    }

    try {
    
        let data = {

            body,
            postId

        };
        
    
        

        if (req.user){
            data.authorId = req.user.id

        }else{

            return res.status(400).json({error:"must be logged in to comment"})

        }



        

        const comment = await prisma.comment.create({data});
        res.json(comment)


    }catch(err){

        return res.status(500).json({error:"failed to create comment"})

    }

}

async function updateComment(req,res){

    const id = Number(req.params.id);

    const body = req.body.body 


    try {

        const existing = await prisma.comment.findUnique({where:{id}})

        if(!existing){

            return res.status(404).json({error:"couldn't find comment"}) //404 for not found

        }



        const isOwner = existing.authorId === req.user.id; // add a question mark

        const isAdmin = req.user.role === "ADMIN";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ error: "Forbidden" }); //403 for forbidden
        }



        const updated = await prisma.comment.update({

            where:{id},
            data:{body}
        })


        res.json(updated);
    }catch(err){

        res.status(500).json({ error: "failed to update comment" });
    }
}


async function deleteComment(req,res){


    const id = Number(req.params.id);


    try {

        const existing = await prisma.comment.findUnique({where:{id}})

        if(!existing){

            return res.status(404).json({error:"unable to find the comment"})


        }

        const isOwner = req.user.id === existing.authorId;
        const isAdmin = req.user.role === "ADMIN"


        if (!isAdmin && !isOwner){

            return res.status(403).json({error:"unauthorized req"})


        }

        const del = await prisma.comment.delete({where:{id}})

        res.json({message:"comment deleted"})


    }catch(err){


        console.log(err)
        res.status(500).json({error:"unable to delete the comment"})

    }
    
}


module.exports = {
  getComments,
  createComment,
  updateComment,
  deleteComment,
};

