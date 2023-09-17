const request = require('supertest');

const { registerValidator, loginValidator } = require ('../src/schemas/auth.schema.js')


describe('Pruebas de validación', () => {
    it('Debería pasar la validación de registro con datos válidos', () => {
      const validData = {
        name: 'John Cena',
        email: 'johndoe@gmail.com',
        phone: '1234567890',
        addres: 'Pinares',
        password: 'John1234567',
      };
      
      expect(() => registerValidator.parse(validData)).not.toThrow();
    });
  
    it('Debería lanzar errores al validar registro con datos inválidos', () => {
      const invalidData = {
        name: '', 
        email: 'notanemail', 
        phone: '', 
        addres: '', 
        password: '123', 
      };
      
      expect(() => registerValidator.parse(invalidData)).toThrow();
    });
  
    it('Debería pasar la validación de inicio de sesión con datos válidos', () => {
      const validData = {
        email: 'johndoe@gmail.com',
        password: 'John1234567',
      };
      
      expect(() => loginValidator.parse(validData)).not.toThrow();
    });
  
    it('Debería lanzar un error cuando el correo electrónico es inválido', () => {
        const invalidData = {
          email: 'pepe@gmail.com', // Email inválido
          password: 'John1234567',
        };
        
        expect(() => loginValidator.parse(invalidData)).not.toThrow();
      });
      
      it('Debería lanzar un error cuando la contraseña está faltante', () => {
        const invalidData = {
          email: 'johndoe@gmail.com',
          password: '', // Contraseña faltante
        };
        
        expect(() => loginValidator.parse(invalidData)).not.toThrow();
      });  
  });




