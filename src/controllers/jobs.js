const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const Social = require("../models/Social");

//create a route with a post method named /jobs/add
router.post("/job/add", async (req, res) => {
  try {
    const data = await Job.create(req.body);
    res.send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
});

//get all jobs
router.get("/jobs", async (req, res) => {
  try {
    const data = await Job.findAll();
    res.send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
});

//delete a job
router.delete("/job/delete/:id", async (req, res) => {
  try {
    const data = await Job.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
});

//edit job
router.put("/job/edit/:id", async (req, res) => {
  try {
    const data = await Job.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.send(data);
  } catch (error) {
    return res.status(400).send(error);
  }
});


module.exports = router;