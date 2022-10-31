import Contact from "../models/Contact.js";
import Note from "../models/Note.js";

export const chartFilter = async (req, res, next) => {
    const {
        query: { year },
    } = req;
    try {
        const filterdArr = await Contact.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(Date.UTC(year, 0, 1)),
                        $lte: new Date(Date.UTC(year, 11, 30)),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        state: "$state",
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ]);

        const chartData = {
            options: [],
            data: {
                total: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                success: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
        };

        for (let i = 1; i < 13; i++) {
            const monthData = filterdArr.filter((item) => {
                if (item._id.month === i) return item;
            });
            if (monthData.length > 0) {
                monthData.forEach((item) => {
                    chartData.data.total[i - 1] += item.count;
                    if (item._id.state === "완료" || item._id.state === "계약") {
                        chartData.data.success[i - 1] += item.count;
                    }
                });
            }
            chartData.options.push(`${i}월`);
        }
        return res.status(200).json(chartData);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const get = async (req, res, next) => {
    const { query } = req;
    try {
        let filterQuery = {};
        if (query.state) filterQuery.state = query.state;
        if (query.company) filterQuery.clientCompany = { $regex: query.company };
        if (query.phone) filterQuery.clientPhone = { $regex: query.phone };
        if (query.month)
            filterQuery.createdAt = {
                $gte: new Date(Date.UTC(2022, Number(query.month) - 1)),
                $lt: new Date(Date.UTC(2022, Number(query.month))),
            };

        const contacts = await Contact.find(filterQuery).sort({ createdAt: -1 });
        return res.status(200).json(contacts);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const create = async (req, res, next) => {
    const { body } = req;
    try {
        const newContact = new Contact({
            ...body,
            isImage: req?.files?.length > 0 ? true : false,
            createdAt: body.contactDate || new Date(),
        });
        await newContact.save();
        return res.status(200).json({ success: "ok" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const update = async (req, res, next) => {
    const {
        params: { id },
        body,
    } = req;
    try {
        const updateContact = await Contact.findByIdAndUpdate(
            id,
            {
                ...body,
            },
            {
                new: true,
            }
        );
        return res.status(200).json(updateContact);
    } catch (error) {
        next(error);
    }
};

export const remove = async (req, res, next) => {
    const {
        params: { id },
    } = req;
    try {
        await Contact.findByIdAndDelete(id);
        return res.status(200).json({ message: "ok" });
    } catch (error) {
        next(error);
    }
};

// note

export const getNote = async (req, res, next) => {
    const {
        params: { contactId },
    } = req;
    try {
        if (!contactId) return next(400, "잘못된 접근입니다");
        const notes = await Note.find({ contactId }).sort({ createdAt: 1 });
        return res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

export const createNote = async (req, res, next) => {
    const {
        body,
        params: { contactId },
    } = req;
    try {
        if (!contactId) return next(400, "잘못된 접근입니다");
        const newNote = new Note({ ...body, contactId });
        await newNote.save();
        return res.status(200).json(newNote);
    } catch (error) {
        next(error);
    }
};

export const updateNote = async (req, res, next) => {
    const {
        body,
        params: { noteId },
    } = req;
    try {
        if (!noteId) return next(400, "잘못된 접근입니다");
        const updatedNote = await Note.findByIdAndUpdate(
            noteId,
            { ...body },
            { new: true }
        );
        return res.status(200).json(updatedNote);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const removeNote = async (req, res, next) => {
    const {
        params: { noteId },
    } = req;
    try {
        if (!noteId) return next(400, "잘못된 접근입니다");
        await Note.findByIdAndDelete(noteId);
        return res.status(200).json();
    } catch (error) {
        console.log(error);
        next(error);
    }
};
