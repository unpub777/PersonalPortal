using AutoMapper;
using Models;
using System.Collections.Generic;

namespace PersonalPortal
{
    public static class MappingExtensions
    {
		public static Page<TDestination> ToMappedPage<TSource, TDestination>(this IMapper mapper, Page<TSource> page)
		{
			IEnumerable<TDestination> sourceList = mapper.Map<IEnumerable<TSource>, IEnumerable<TDestination>>(page?.Records);
			Page<TDestination> pagedResult = new Page<TDestination>(sourceList) { CurrentPage = page.CurrentPage, PageSize = page.PageSize, TotalPages = page.TotalPages };
			return pagedResult;
		}
	}
}
