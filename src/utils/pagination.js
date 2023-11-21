paginate = async (model, pageNumber, query = {}) => {
    try {
        const skip = (pageNumber - 1) * pageSize;
        const totalDocs = await model.countDocuments(query);
        const totalPages = Math.ceil(totalDocs / pageSize);

        const results = await model.find(query).skip(skip).limit(pageSize).exec();

        return {
            results,
            page: pageNumber,
            totalPages,
            pageSize,
            totalDocs,
        };
    } catch (error) {
        throw new Error(`Unable to paginate: ${error}`);
    }
};
