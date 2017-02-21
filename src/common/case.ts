// From kebab-case/PascalCase
export function toCamel(str: string) {
  return convertDashes(uncapitalize(str));
}

function capitalize(v: string) {
  return `${v.slice(0, 1).toUpperCase()}${v.slice(1)}`;
}

function uncapitalize(v: string) {
  return `${v.slice(0, 1).toLowerCase()}${v.slice(1)}`;
}

function convertDashes(str: string) {
  return str
    .split('-')
    .map((v, i) => (!i ? v : capitalize(v)))
    .join('');
}
