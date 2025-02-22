const PatientFile = require("../../database/models/patientFile");
const { User } = require("../../database/models/User");

const resolvers = {
    Query: {
        getPatientFiles: async () => {
            return await PatientFile.find();
        },
        getPatientFile: async (_, args) => {
            return await PatientFile.findById(args.id);
        },

        getFilesByPatient: async (_, { id, therapistId }) => {
            return await PatientFile.find({ patient: id, therapist: therapistId }).sort({ $natural: -1 });
        },
    },
    Mutation: {

        createPatientFile: async (_, { title, remarks, patient, therapist }) => {
            const createFile = new PatientFile({
                title: title,
                remarks: remarks,
                patient: patient,
                therapist: therapist,
                createdAt: new Date().toDateString(),

            });
            if(remarks === null) {

                throw new Error("You didn't add notes!");

            }else
            return await createFile.save();
        },
        updatePatientFile: async (_, args) => {
            const { id, remarks, title } = args;
            if (remarks !== "") {
                const file = await PatientFile.findByIdAndUpdate(
                    id,
                    { remarks, title },
                    { new: true }
                );
                return file;
            }
            else {

                throw new Error("You didn't add notes!");

            }
        },

        deletePatientFile: async (_, args) => {
            const { id } = args;
            const result = await PatientFile.findByIdAndDelete(id);
            if (result) {
                return true
            } else { return false }

        }
    },
    PatientFile: {
        // consultation: async (parent) => {
        //     return await Consultation.findById(parent.consultation);
        // },
        therapist: async (parent) => {
            return await User.findById(parent.therapist);
        },
        patient: async (parent) => {
            return await User.findById(parent.patient);
        }
    }
}

module.exports = resolvers;