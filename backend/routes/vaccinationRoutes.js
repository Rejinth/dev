const router = require('express').Router();
const VaccForm = require('../models/vaccinationForm');

router.post('/create', async (req, res) => {
    try {
        const newVaccForm = new VaccForm(req.body);
        console.log("newVaccForm",newVaccForm)
        const savedForm = await newVaccForm.save();
        res.status(201).json({
            message: "Vaccination form created successfully",
            form: savedForm
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const forms = await VaccForm.find().sort({ appointmentDate: -1 });
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const form = await VaccForm.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ message: "Form not found" });
        }
        res.status(200).json(form);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const updatedForm = await VaccForm.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedForm) {
            return res.status(404).json({ message: "Form not found" });
        }
        res.status(200).json({
            message: "Form updated successfully",
            form: updatedForm
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedForm = await VaccForm.findByIdAndDelete(req.params.id);
        if (!deletedForm) {
            return res.status(404).json({ message: "Form not found" });
        }
        res.status(200).json({ message: "Form deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/status/:status', async (req, res) => {
    try {
        const forms = await VaccForm.find({ status: req.params.status })
            .sort({ appointmentDate: -1 });
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;