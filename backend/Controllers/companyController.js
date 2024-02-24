import Company from '../models/CompanySchema.js'

export const updateCompany = async(req, res) => {
    const id = req.params.id
    
    try {
        const updatedCompany = await Company.findByIdAndUpdate(id, {$set:req.body}, {new:true})
        res.status(200).json({success: true, msg: "User updated successfully", data: updatedCompany})
    } catch(err) {
        res.status(500).json({success: false, msg: "User update failed", error: err})
    }
}

export const deleteCompany = async(req, res) => {
    const id = req.params.id
    
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({success: true, msg: "Company deleted successfully"})
    } catch(err) {
        res.status(500).json({success: false, msg: "Company deletion failed", error: err})
    }
}

export const getSingleCompany = async(req, res) => {
    const id = req.params.id
    
    try {
        const user = await Company.findById(id).select('-password')
        if(user != null)
            res.status(200).json({success: true, msg: "Company found", data: user})
        else
            res.status(404).json({success:false, msg: "Company not found", data: null})
    } catch(err) {
        res.status(500).json({success: false, msg: "Company not found", error: err})
    }
}

export const getAllCompanies = async(req, res) => {
    try {
        const users = await Company.find().select('-password')
        res.status(200).json({success: true, msg: "Companys found", data: users})
    } catch(err) {
        res.status(500).json({success: false, msg: "Companys not found", error: err})
    }
}