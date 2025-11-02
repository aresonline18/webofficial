import { useLocation } from "/node_modules/.vite/deps/react-router-dom.js?v=7cbad96a";
export const useUrlParams = ()=>{
    const location = useLocation();
    const getParam = (param)=>{
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get(param);
    };
    const hasParam = (param)=>{
        const searchParams = new URLSearchParams(location.search);
        return searchParams.has(param);
    };
    return {
        getParam,
        hasParam
    };
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZVVybFBhcmFtcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VMb2NhdGlvbiB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XG5cbmV4cG9ydCBjb25zdCB1c2VVcmxQYXJhbXMgPSAoKSA9PiB7XG4gIGNvbnN0IGxvY2F0aW9uID0gdXNlTG9jYXRpb24oKTtcbiAgXG4gIGNvbnN0IGdldFBhcmFtID0gKHBhcmFtOiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsID0+IHtcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGxvY2F0aW9uLnNlYXJjaCk7XG4gICAgcmV0dXJuIHNlYXJjaFBhcmFtcy5nZXQocGFyYW0pO1xuICB9O1xuXG4gIGNvbnN0IGhhc1BhcmFtID0gKHBhcmFtOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGxvY2F0aW9uLnNlYXJjaCk7XG4gICAgcmV0dXJuIHNlYXJjaFBhcmFtcy5oYXMocGFyYW0pO1xuICB9O1xuXG4gIHJldHVybiB7IGdldFBhcmFtLCBoYXNQYXJhbSB9O1xufTtcbiJdLCJuYW1lcyI6WyJ1c2VMb2NhdGlvbiIsInVzZVVybFBhcmFtcyIsImxvY2F0aW9uIiwiZ2V0UGFyYW0iLCJwYXJhbSIsInNlYXJjaFBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsInNlYXJjaCIsImdldCIsImhhc1BhcmFtIiwiaGFzIl0sIm1hcHBpbmdzIjoiQUFBQSxTQUFTQSxXQUFXLFFBQVEsbUJBQW1CO0FBRS9DLE9BQU8sTUFBTUMsZUFBZTtJQUMxQixNQUFNQyxXQUFXRjtJQUVqQixNQUFNRyxXQUFXLENBQUNDO1FBQ2hCLE1BQU1DLGVBQWUsSUFBSUMsZ0JBQWdCSixTQUFTSyxNQUFNO1FBQ3hELE9BQU9GLGFBQWFHLEdBQUcsQ0FBQ0o7SUFDMUI7SUFFQSxNQUFNSyxXQUFXLENBQUNMO1FBQ2hCLE1BQU1DLGVBQWUsSUFBSUMsZ0JBQWdCSixTQUFTSyxNQUFNO1FBQ3hELE9BQU9GLGFBQWFLLEdBQUcsQ0FBQ047SUFDMUI7SUFFQSxPQUFPO1FBQUVEO1FBQVVNO0lBQVM7QUFDOUIsRUFBRSJ9