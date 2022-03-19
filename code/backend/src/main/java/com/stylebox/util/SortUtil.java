package com.stylebox.util;

import exception.Rest400Exception;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class SortUtil {

    public Pageable sortPage(String sort, int page, int limit, List<String> sortCondition) {
        Pageable pageable;
        if (!sort.isEmpty()) {
            char symbol = sort.charAt(0);
            if (symbol == '-') {
                String substring = sort.substring(1);
                if (sortCheck(substring, sortCondition)) {
                    pageable = PageRequest.of(page, limit, Sort.by(Sort.Direction.ASC, substring));
                } else {
                    throw new Rest400Exception("Invalid sort");
                }
            } else {
                if (sortCheck(sort, sortCondition)) {
                    pageable = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, sort));
                } else {
                    throw new Rest400Exception("Invalid sort");
                }
            }
        } else {
            pageable = PageRequest.of(page, limit);
        }
        return pageable;
    }

    public Sort sortPage(String sort, List<String> sortCondition) {
        Sort by = null;
        if (!sort.isEmpty()) {
            char symbol = sort.charAt(0);
            if (symbol == '-') {
                String substring = sort.substring(1);
                if (sortCheck(substring, sortCondition)) {
                    by = Sort.by(Sort.Direction.DESC, substring);
                } else {
                    throw new Rest400Exception("Invalid sort");
                }
            } else {
                if (sortCheck(sort, sortCondition)) {
                    by = Sort.by(Sort.Direction.ASC, sort);
                } else {
                    throw new Rest400Exception("Invalid sort");
                }
            }
        }
        return by;
    }

    public String sortPageByHql(String sort, List<String> sortCondition) {
        if (!sort.isEmpty()) {
            char symbol = sort.charAt(0);
            if (symbol == '-') {
                String substring = sort.substring(1);
                if (sortCheck(substring, sortCondition)) {
                    return " order by " + substring;
                } else {
                    throw new Rest400Exception("Invalid sort");
                }
            } else {
                if (sortCheck(sort, sortCondition)) {
                    return " order by " + sort + " desc";
                } else {
                    throw new Rest400Exception("Invalid sort");
                }
            }
        } else {
            return "";
        }
    }

    public boolean sortCheck(String str, List<String> sortCondition) {
        for (String s : sortCondition) {
            if (str.equals(s)) {
                return true;
            }
        }
        return false;
    }

//    public List<PaperDTO> sortPageByList(List<PaperDTO> data, int page, int limit, String sort, List<String> sortCondition) {
//        Stream<PaperDTO> streDatas = data.stream();
//        Comparator<Integer> integerComparator = Comparator.nullsLast(Comparator.naturalOrder());
//        String order = "";
//        if (!sort.isEmpty()) {
//            char symbol = sort.charAt(0);
//            if (symbol == '-') {
//                String substring = sort.substring(1);
//                if (sortCheck(substring, sortCondition)) {
//                    integerComparator = integerComparator.reversed();
//                    order = substring;
//                } else {
//                    throw new Rest400Exception("Invalid sort");
//                }
//            } else {
//                if (sortCheck(sort, sortCondition)) {
//                    order = sort;
//                } else {
//                    throw new Rest400Exception("Invalid sort");
//                }
//            }
//        }
//        switch (order) {
//            case "year":
//                streDatas = streDatas.sorted(Comparator.comparing(PaperDTO::getYear, integerComparator));
//                break;
//            case "readCount":
//                streDatas = streDatas.sorted(Comparator.comparing(PaperDTO::getReadCount, integerComparator));
//                break;
//            case "saveCount":
//                streDatas = streDatas.sorted(Comparator.comparing(PaperDTO::getSaveCount, integerComparator));
//            default:
//                break;
//        }
//        return streDatas.skip(page * limit).limit(limit).collect(Collectors.toList());
//
//    }

}
