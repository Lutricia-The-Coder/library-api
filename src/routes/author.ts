import {Router , Request, Response} from 'express';
import {body, param, validationResult} from 'express-validator'

const router= Router()

let authors = [
    {id:1, a_name: "" , title:"", year: 2026},
     {id:2, a_name: "" , title:"", year: 2026}
]

router.get("/", [])