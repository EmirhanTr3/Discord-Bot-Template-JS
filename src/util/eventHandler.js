const { getAllFiles } = require('./functions')

module.exports = {
    async registerEvents(client){
        const events = getAllFiles('./src/events')
        const registerStartedAt = new Date()
        var registeredEvents = []
        for (const file of events){
            registerEvent(client, `../.${file}`)
            registeredEvents.push(file)
        }
        console.log(`Successfully registered ${registeredEvents.length} events! (${new Date() - registerStartedAt}ms)`)
    }
}

function registerEvent(client, path){
    delete require.cache[require.resolve(`${path}`)];
    const event = require(`${path}`)
    if (event.once){
        client.once(event.name, (...args) => {
            delete require.cache[require.resolve(`${path}`)];
            require(`${path}`).execute(...args)
        })
    }else{
        client.on(event.name, async (...args) => {
            delete require.cache[require.resolve(`${path}`)];
            require(`${path}`).execute(...args)
        })
    }
}