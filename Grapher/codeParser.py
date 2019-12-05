import clang.cindex


class SrcBasicElement:
    def __init__(self, level, name, kind, startPoint, endPoint):
        self.level = level
        self.name = name
        self.kind = kind
        self.startPoint = startPoint
        self.endPoint = endPoint


# Loops/ Conditional Statements / functions
class BlockElement(SrcBasicElement):
    def __init__(self, level, name, kind, startPoint, endPoint, localElements=[], foreignElements=[]):
        super(BlockElement, self).__init__(level, name, kind, startPoint, endPoint)
        self.localElements = localElements
        self.foreignElements = foreignElements

    def to_json_dict(self):
        return {
            'level': self.level,
            'name': self.name,
            'kind': self.kind,
            'startPoint': self.startPoint,
            'endPoint': self.endPoint,
            'localElements': self.localElements,
            'foreignElements': self.foreignElements

        }


class CodeParser:
    def __init__(self):
        self.index = clang.cindex.Index.create()
        self.lvl = 0
        self.SrcRoot = BlockElement(0, 'ROOT', '', 0, 0, [], [])

    def start(self, data):
        self.parsSrc(self.index.parse('tmp.cpp', args=['-std=c++11'],
                                      unsaved_files=[('tmp.cpp', data)], options=0).cursor, self.lvl, self.SrcRoot)
        return self.SrcRoot

    def parsSrc(self, node, lvl, rootElement):

        subRoot = None
        if (str(node.kind).split(".")[1] == "WHILE_STMT" or str(node.kind).split(".")[1] == "IF_STMT"
                # or str(node.kind).split(".")[1] == "DECL_STMT"
                or str(node.kind).split(".")[1] == "DECL_REF_EXPR" or
                str(node.kind).split(".")[1] == "CALL_EXPR" or str(node.kind).split(".")[1] == "TYPE_REF" or
                str(node.kind).split(".")[1] == "CLASS_DECL" or str(node.kind).split(".")[1] == "FIELD_DECL" or
                str(node.kind).split(".")[1] == "CLASS_TEMPLATE" or str(node.kind).split(".")[1] == "FUNCTION_DECL" or
                str(node.kind).split(".")[1] == "VAR_DECL" or str(node.kind).split(".")[1] == "FOR_STMT"):

            subRoot = BlockElement(lvl, node.spelling + "#" + (str(node.extent.start).split(",")[1]).split(" ")[2],
                                   str(node.kind).split(".")[1],
                                   (str(node.extent.start).split(",")[1]).split(" ")[2],
                                   (str(node.extent.end).split(",")[1]).split(" ")[2], [],
                                   [])
            if subRoot.kind == "VAR_DECL":
                rootElement.localElements.append(subRoot)
            else:
                rootElement.foreignElements.append(subRoot)

        if node.get_children():
            lvl += 1
            for c in node.get_children():
                # if (str(node.kind).split(".")[1] == "WHILE_STMT" or str(node.kind).split(".")[1] == "IF_STMT"
                #         # or str(node.kind).split(".")[1] == "DECL_STMT"
                #         or str(node.kind).split(".")[1] == "DECL_REF_EXPR" or
                #         str(node.kind).split(".")[1] == "CALL_EXPR" or str(node.kind).split(".")[1] == "TYPE_REF" or
                #         str(node.kind).split(".")[1] == "CLASS_DECL" or str(node.kind).split(".")[1] == "FIELD_DECL" or
                #         str(node.kind).split(".")[1] == "CLASS_TEMPLATE" or str(node.kind).split(".")[1] == "FUNCTION_DECL" or
                #         str(node.kind).split(".")[1] == "VAR_DECL"):
                #     print('\t' * lvl, lvl, node.spelling, str(node.kind).split(".")[1], (str(node.extent.start)).split(",")[1], " -> ", (str(node.extent.end)).split(",")[1])
                if subRoot is None:
                    self.parsSrc(c, lvl, rootElement)
                else:
                    self.parsSrc(c, lvl, subRoot)

        lvl -= 1
