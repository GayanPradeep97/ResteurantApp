import { async } from "@firebase/util";
import { data } from "autoprefixer";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";

//saving new item
export const saveItem = async (data) => {
    await setDoc(
        doc(firestore, "foodItems", `${Date.now()}`),data, {merge: true,
        });
    };
