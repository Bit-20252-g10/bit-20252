import {expect, jest} from '@jest/globals';
const saveMock = jest.fn();
jest.unstable_mockModule('../../src/models/index.js', () => {
    const mockConstructor = jest.fn(() => ({ save: saveMock}));
    mockConstructor.findOne = jest.fn();
    mockConstructor.find = jest.fn();
    return { default: mockConstructor };
});

const {getAllUsers, createUser} = await import('../../src/controller/index.js');
const User = (await import('../../src/models/index.js')).default;

describe('Get All Users', () => {
    it('Debería retornar un status 200 y la lista de los usuarios', async () =>{
        // Arrange
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis() ,
            json: jest.fn()
        }
        const mockUserList = [];
        const mockFilterDB = {}
        // Act 
        // llamar al metodo del controlador
        User.find.mockResolvedValue(mockUserList);
        await getAllUsers(req,res);
        // Assert
        expect(User.find).toHaveBeenCalledWith(mockFilterDB);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUserList);
    });
})

describe('Create Users', () => {
    it('Debería retornar un status 201 y crear un usuario', async () => {
        // Arrange
        const req = {body: {email: 'a@a.com', password: 'test-password'}};
        const res = {
            status: jest.fn().mockReturnThis() ,
            json: jest.fn()
        };
        const mockCreateSuccessResponse = {detail: 'La cuenta con a@a.com se creó satisfactoriamente'};
        // Act
        User.findOne.mockResolvedValue(null);
        saveMock.mockClear();
        await createUser(req,res);
        // Assert
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockCreateSuccessResponse);
    })  
})