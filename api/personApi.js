/**
 * @description Routed api's that call repository functions of the Person model
 * 
 * @author Guilherme Tomazi Klein
 */

"use strict";

const { personRepository } = require("../repository/personRepository");
const { Router } = require("express");
const personRouter = new Router();

personRouter.get('/',
    async ({res, next}) => {
        try {
            const result = await personRepository.getAllPersons();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    });

personRouter.get("/:id",
    async ({req, res, next}) => {
        try {
            const result = await personRepository.getPersonById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    });

personRouter.post("/",
    async ({req, res, next}) => {
        try {
            const result = await personRepository.createPerson(req.body);
            const endpoint = `${req.headers.host}${req.originalUrl}${result[0].id}`;
            result.push(endpoint);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    });

personRouter.delete("/:id",
    async ({req, res, next}) => {
        try {
            await personRepository.deletePerson(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    });

personRouter.put("/:id",
    async ({req, res, next}) => {
        try {
            await personRepository.updatePerson(req.body, req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    });

module.exports = personRouter;