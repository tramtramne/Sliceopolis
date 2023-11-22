const { PAGE_SIZE } = require('../constants/index');

const paginate = async (model, pageNumber, query = {}) => {
    try {
        const skip = (pageNumber - 1) * pageSize;
        const totalDocs = await model.countDocuments(query);
        const totalPages = Math.ceil(totalDocs / PAGE_SIZE);

        const results = await model.find(query).skip(skip).limit(PAGE_SIZE).exec();

        return {
            results,
            page: pageNumber,
            totalPages,
            totalDocs,
        };
    } catch (error) {
        throw new Error(`Unable to paginate: ${error}`);
    }
};
