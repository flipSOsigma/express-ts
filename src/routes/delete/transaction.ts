import { Router } from "express";
import { db } from "../../lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";

const router = Router()

router.delete('/transaction/:q', async (req, res) => {
  const query = req.params.q;
  const userRef = doc(db, 'data', query);
  try {
    await deleteDoc(userRef);
    res.json({
      status: "success",
      message: "Data deleted successfully",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "Failed to delete data",
      error
    });
  }
})

export default router