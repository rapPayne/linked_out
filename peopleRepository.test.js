import repo from './peopleRepository';

describe('People repository', () => {
  it('returns all people', () => {
    expect.assertions(5)
    const people = repo.getAllPeople();
    expect(people).toBeDefined();
    expect(typeof people).toBe("object");
    expect(people instanceof Array).toBe(true);
    expect(people.length).toBeGreaterThan(0);
    // A person has id, cell, first, last, email
    expect(people[0].cell).toBeDefined();

  })

  it('returns a person', () => {
    expect.assertions(1)
    // Arrange
    const id = 60;
    // Act
    const person = repo.getPerson(id)
    // Assert
    expect(person).toBeDefined();
  })

})
