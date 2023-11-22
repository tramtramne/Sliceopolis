const { model } = require('mongoose');

const paginate = async (model, pageNumber, PAGE_SIZE, query = {}) => {
    const skip = (pageNumber - 1) * PAGE_SIZE;
    const totalDocs = await model.countDocuments(query);
    const totalPages = Math.ceil(totalDocs / PAGE_SIZE);

    const results = await model.find(query).skip(skip).limit(PAGE_SIZE).exec();

    return {
        results,
        page: pageNumber,
        totalPages,
        totalDocs,
    };
};
module.exports = { paginate };
