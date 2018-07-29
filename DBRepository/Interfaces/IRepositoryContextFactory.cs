namespace DBRepository.Interfaces
{
    public interface IRepositoryContextFactory
    {
		RepositoryContext CreateDbContext(string connectionString);
	}
}
