module.exports = (sequilize, Sequilize)=>{
    const Event = sequilize.define('event',{
        name: {
            type:Sequilize.STRING,
        },
        objetive: {
            type:Sequilize.STRING,
        },
        date: {
            type:Sequilize.DATE,
        },
        time: {
            type: Sequilize.TIME,
        },
        statusDelete: {
            type:Sequilize.BOOLEAN,
            defaultValue: false,
        },
    });
    return Event;
};