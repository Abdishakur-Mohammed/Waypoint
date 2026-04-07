
import Application from "../models/Application.js"


export const createApplication = async (req, res) => {
    try {
        const { company_name, jobTitle, status, appliedIn, salary, locationType, notes, appliedDate } = req.body;

        const application = await Application.create({
            company_name,
            jobTitle,
            status,
            appliedIn,
            salary,
            locationType,
            notes,
            appliedDate,
            user: req.user._id
        })

        console.log("Application created successfully")
        return res.status(201).json(application)



    } catch (error) {
        console.log("Unable to create application", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getAllApplications = async (req, res) => {
    try {

        const applications = await Application.find({ user: req.user._id })
        console.log("Applications fetched successfully")
        return res.status(200).json(applications)

    } catch (error) {
        console.log("Unable to fetch applications", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const UpdateApplication = async (req, res) => {
    try {

        const { company_name, jobTitle, status, appliedIn, salary, locationType, notes, appliedDate } = req.body

        const updateApplication = await Application.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { company_name, jobTitle, status, appliedIn, salary, locationType, notes, appliedDate },
            { new: true }
        )

        if (!updateApplication) return res.status(404).send("Application not found")

        console.log("Application updated successfully")
        return res.status(200).json(updateApplication)

    } catch (error) {
        console.log("Unable to update application", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const deleteApplication = async (req, res) => {
    try {
        const deleteApplication = await Application.findOneAndDelete({ _id: req.params.id, user: req.user._id })

        if (!deleteApplication) return res.status(404).send("Application not found")

        console.log("Application deleted successfully")
        return res.status(200).json("Deleted Successfully")

    } catch (error) {
        console.log("Unable to delete application", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}