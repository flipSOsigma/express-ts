import { Router } from "express"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { encodeBase64 } from "../../lib/functions"
import { auth } from "../../lib/firebase"

const router = Router()
router.post('/signup', async (req, res) => {
  const { username, password }: {username:string, password:string} = req.body
  await createUserWithEmailAndPassword(auth, username, password)
  .then((userCredential) => {
    try {
      const user = userCredential.user
      const tokenString = JSON.stringify(user)
      const token = encodeBase64(tokenString)
      res.json({
        status: "success",
        message: 'Sign up successfully',
        token
      })
    }catch(error: any) {
      console.log(error)
      res.json({
        status: "error",
        message: error.code,
      })
    }
  })
  .catch((error) => {
    res.json({
      status: "error",
      message: error.code,
    })
  })
})

export default router