export default {
    save: jest.fn(() => Promise.resolve()),
    findById: jest.fn(()=> Promise.resolve({params: {
        numberAccountSender: 1,
        numberAccountRecived: 2,
        valueTransfer: 15,
        id: '80000001-0193-44d8-bbac-e687771b5ac8',
        created_at: new Date('2024-03-03T22:58:31')
      }})),
}