Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.button = Behavior({
    externalClasses: [ "hover-class" ],
    properties: {
        id: String,
        lang: {
            type: String,
            value: "en"
        },
        businessId: Number,
        sessionFrom: String,
        sendMessageTitle: String,
        sendMessagePath: String,
        sendMessageImg: String,
        showMessageCard: Boolean,
        appParameter: String,
        ariaLabel: String
    }
});