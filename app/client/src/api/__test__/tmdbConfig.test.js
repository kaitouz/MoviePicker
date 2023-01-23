import { config, movieGenres, tvGenres } from '../tmdbConfig';

describe('config', () => {
    it('should have a baseUrl property', () => {
        expect(config).toHaveProperty('baseUrl');
    });

    it('should have a apiKey property', () => {
        expect(config).toHaveProperty('apiKey');
    });

    it('should have a originalImage property', () => {
        expect(config).toHaveProperty('originalImage');
    });

    it('should have a w500Image property', () => {
        expect(config).toHaveProperty('w500Image');
    });

    it('originalImage should return a string', () => {
        expect(typeof config.originalImage('test')).toBe('string');
    });

    it('w500Image should return a string', () => {
        expect(typeof config.w500Image('test')).toBe('string');
    });
});

describe('movieGenres', () => {
    it('should be an array', () => {
        expect(Array.isArray(movieGenres)).toBe(true);
    });

    it('should have at least one item', () => {
        expect(movieGenres.length).toBeGreaterThan(0);
    });

    it('should contain an object with an id and name property', () => {
        expect(movieGenres[0]).toHaveProperty('id');
        expect(movieGenres[0]).toHaveProperty('name');
    });
});

describe('tvGenres', () => {
    it('should be an array', () => {
        expect(Array.isArray(tvGenres)).toBe(true);
    });

    it('should have at least one item', () => {
        expect(tvGenres.length).toBeGreaterThan(0);
    });

    it('should contain an object with an id and name property', () => {
        expect(tvGenres[0]).toHaveProperty('id');
        expect(tvGenres[0]).toHaveProperty('name');
    });
});
