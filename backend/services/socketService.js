// Socket service to manage socket.io instance globally
let ioInstance = null;

const setSocketInstance = (io) => {
    ioInstance = io;
};

const getSocketInstance = () => {
    return ioInstance;
};

const emitToNamespace = (namespace, event, data) => {
    if (ioInstance) {
        const nsp = ioInstance.of(namespace);
        nsp.emit(event, data);
        console.log(`Emitted ${event} to namespace ${namespace}:`, data);
    } else {
        console.log('Socket instance not available');
    }
};

module.exports = {
    setSocketInstance,
    getSocketInstance,
    emitToNamespace
};
