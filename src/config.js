const common = {
    // Storing API keys like this is of course really bad practice, but we do it for everyone's convenience in this case :)
    // If you have generated your own key, you should replace all of these with that one instead.
    // Remember that it's always possible to run the app in mocked mode as well.
    YOUTUBE_API_KEYS: [
        "AIzaSyALOm_NI0LSR7Aky9Plhh6LejGwcsdsagI",
        "AIzaSyCz3HmA4iukTVNLCgwZqkxMw8L7nYrYlcM",
        "AIzaSyAxS_YfpXKSvdS9FCwN-WlW3_Z1sWimRUo",
        "AIzaSyC1Um9mk_Fjq_VSKptp3JTRXoY3W4aJZK8",
        "AIzaSyCGKZF4sl9YE9LnL2S_XXXiNhl0_rziNrw",
        "AIzaSyA3NcpZ9Q-6iAfqq3QQiTywG4Btk9dAXAE",
        "AIzaSyD7Q7PcQlP_RUGuAYDQF_65kZfIYjRaF_k"
    ]
};

const dev = {
    hotReload: true,
    mockedMode: false
};

const prod = {
    hotReload: false,
    mockedMode: false
};

export default {
    ...common,
    dev,
    prod
};