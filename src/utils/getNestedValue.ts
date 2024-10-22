export default function getNestedValue(path: string, obj: any): any {
    return path.split('.').reduce((acc, part) => {
        return acc && acc[part];
    }, obj);
}
